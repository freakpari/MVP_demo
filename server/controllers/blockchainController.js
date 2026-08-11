const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");
const { realEstateContract, escrowContract } = require("../config/blockchain");
const { ethers } = require("ethers");

exports.mintProperty = asyncErrorHandler(async (req, res, next) => {
    const { tokenURI } = req.body;

    if (!tokenURI) {
        return next(new ErrorHandler("tokenURI is required", 400));
    }

    const tx = await realEstateContract.mint(tokenURI);
    const receipt = await tx.wait();

    const tokenId = receipt.events?.find((e) => e.event === "Transfer")
        ?.args?.tokenId?.toString();

    res.status(201).json({
        success: true,
        tokenId,
        txHash: tx.hash,
    });
});

exports.getTotalSupply = asyncErrorHandler(async (req, res, next) => {
    const total = await realEstateContract.totalSupply();
    res.status(200).json({ success: true, totalSupply: total.toString() });
});

exports.getPropertyToken = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;

    const [tokenURI, owner] = await Promise.all([
        realEstateContract.tokenURI(id),
        realEstateContract.ownerOf(id),
    ]);

    res.status(200).json({ success: true, tokenId: id, tokenURI, owner });
});


exports.listProperty = asyncErrorHandler(async (req, res, next) => {
    const { nftID, buyer, purchasePrice, escrowAmount } = req.body;

    if (!nftID || !buyer || !purchasePrice || !escrowAmount) {
        return next(new ErrorHandler("nftID, buyer, purchasePrice and escrowAmount are required", 400));
    }

    const tx = await escrowContract.list(
        nftID,
        buyer,
        ethers.utils.parseEther(purchasePrice.toString()),
        ethers.utils.parseEther(escrowAmount.toString())
    );
    await tx.wait();

    res.status(200).json({ success: true, txHash: tx.hash });
});

exports.updateInspection = asyncErrorHandler(async (req, res, next) => {
    const { nftID, passed } = req.body;

    const tx = await escrowContract.updateInspectionStatus(nftID, passed);
    await tx.wait();

    res.status(200).json({ success: true, txHash: tx.hash });
});

exports.approveSale = asyncErrorHandler(async (req, res, next) => {
    const { nftID } = req.body;

    const tx = await escrowContract.approveSale(nftID);
    await tx.wait();

    res.status(200).json({ success: true, txHash: tx.hash });
});

exports.finalizeSale = asyncErrorHandler(async (req, res, next) => {
    const { nftID } = req.body;

    const tx = await escrowContract.finalizeSale(nftID);
    await tx.wait();

    res.status(200).json({ success: true, txHash: tx.hash });
});

exports.getEscrowStatus = asyncErrorHandler(async (req, res, next) => {
    const { nftID } = req.params;

    const [listed, price, deposit, buyerAddr, inspectionPassed, balance] =
        await Promise.all([
            escrowContract.isListed(nftID),
            escrowContract.purchasePrice(nftID),
            escrowContract.escrowAmount(nftID),
            escrowContract.buyer(nftID),
            escrowContract.inspectionPassed(nftID),
            escrowContract.getBalance(),
        ]);

    res.status(200).json({
        success: true,
        nftID,
        isListed: listed,
        purchasePrice: ethers.utils.formatEther(price),
        escrowAmount: ethers.utils.formatEther(deposit),
        buyer: buyerAddr,
        inspectionPassed,
        contractBalance: ethers.utils.formatEther(balance),
    });
});
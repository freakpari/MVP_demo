const express = require("express");
const {
    mintProperty,
    getTotalSupply,
    getPropertyToken,
    listProperty,
    updateInspection,
    approveSale,
    finalizeSale,
    getEscrowStatus,
} = require("../controllers/blockchainController");

const router = express.Router();

router.route("/realestate/mint").post(mintProperty);
router.route("/realestate/total-supply").get(getTotalSupply);
router.route("/realestate/token/:id").get(getPropertyToken);

router.route("/escrow/list").post(listProperty);
router.route("/escrow/inspection").post(updateInspection);
router.route("/escrow/approve").post(approveSale);
router.route("/escrow/finalize").post(finalizeSale);
router.route("/escrow/status/:nftID").get(getEscrowStatus);

module.exports = router;
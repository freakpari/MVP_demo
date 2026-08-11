module.exports = [
    "function nftAddress() public view returns (address)",
    "function seller() public view returns (address)",
    "function inspector() public view returns (address)",
    "function lender() public view returns (address)",

    "function list(uint256 _nftID, address _buyer, uint256 _purchasePrice, uint256 _escrowAmount) public payable",
    "function depositEarnest(uint256 _nftID) public payable",
    "function updateInspectionStatus(uint256 _nftID, bool _passed) public",
    "function approveSale(uint256 _nftID) public",
    "function finalizeSale(uint256 _nftID) public",
    "function cancelSale(uint256 _nftID) public",
    "function getBalance() public view returns (uint256)",

    "function isListed(uint256) public view returns (bool)",
    "function purchasePrice(uint256) public view returns (uint256)",
    "function escrowAmount(uint256) public view returns (uint256)",
    "function buyer(uint256) public view returns (address)",
    "function inspectionPassed(uint256) public view returns (bool)",
];
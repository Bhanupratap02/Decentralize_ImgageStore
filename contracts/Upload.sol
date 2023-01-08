//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Upload{
    struct Access {
          address user;
          bool access; 
    }
 // mapping from address to array of img url
   mapping(address => string[]) value;
   // mapping from address(owner) to another mapping which maps address to 
   // bool
   mapping(address => mapping(address => bool)) ownerShip;

   mapping(address => Access[]) accessList;

   mapping(address => mapping(address => bool)) previousData;

   function add(address _user,string memory url) external {
       value[_user].push(url);
   }

   function allow(address user) external {
       require(user != msg.sender,"you are the owner and you have already access to your data");
       ownerShip[msg.sender][user] = true;
       if(previousData[msg.sender][user]){
           for(uint i = 0;i<accessList[msg.sender].length;i++){
               if(accessList[msg.sender][i].user == user){
                   accessList[msg.sender][i].access = true;
               }
           }
       } else{
           accessList[msg.sender].push(Access(user,true));
           previousData[msg.sender][user] = true;
       }
   }


   function disallow(address user) public {
     require(user != msg.sender,"you are the owner and you cannot disallow yourself");
       ownerShip[msg.sender][user] = false;
       for(uint i =0;i<accessList[msg.sender].length;i++){
           if(accessList[msg.sender][i].user == user){
               accessList[msg.sender][i].access = false;
           }
       }
   }

   function display(address _user) external view returns(string[] memory) {
       require(_user == msg.sender || ownerShip[_user][msg.sender],"You don't have access");
       return value[_user];
   }

   function shareAccess() public view returns(Access[] memory){
       return accessList[msg.sender];
   }
}
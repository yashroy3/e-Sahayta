// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {

  string public name ="SimpleStorage";
  mapping(uint => File) public files; //store and list videos

  //Model the video
  struct File{
    uint id;
    string detail;
    string title;
    address author;
  }

  event FileUploaded(
    uint id,
    string detail,
    string title,
    address author
  );

  constructor() public{

  }

  function uploadFile(uint _id,string memory _detail,string memory _title) public {
    
    //making sure fileHash exists
    require(bytes(_detail).length>0);
    // make sure video title exists
    require(bytes(_title).length>0);
    // make sure uploader address exists
    require(msg.sender!=address(0));

    
    files[_id] = File(_id,_detail,_title,msg.sender); //add video

    emit FileUploaded(_id,_detail,_title,msg.sender);

  }
}

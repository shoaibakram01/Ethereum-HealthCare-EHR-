pragma solidity >=0.4.21 <0.7.0;

contract Doctor {
    mapping (address => doctor) internal doctors;
    mapping (address => mapping(address => uint)) internal doctorToPatient;
    
    struct doctor {
        string name;
        string age;
        address id;
        address[] patient_list;
    }
    
    modifier checkDoctor(address id) {
        doctor memory d = doctors[id];
        require(d.id > address(0x0));//check if doctor exist
        _;
    }
    
    function getDoctorInfo() public view checkDoctor(msg.sender) returns(string memory, string memory, address[] memory){
        doctor memory d = doctors[msg.sender];
        return (d.name, d.age, d.patient_list);
    }
    
    function signupDoctor(string memory _name, string memory _age) public {
        doctor memory d = doctors[msg.sender];
        require(keccak256(abi.encodePacked(_name)) != keccak256(""));
        require(keccak256(abi.encodePacked(_age)) != keccak256(""));
        require(!(d.id > address(0x0)));

        doctors[msg.sender] = doctor({name:_name,age:_age,id:msg.sender,patient_list:new address[](0)});
    }    
    
}
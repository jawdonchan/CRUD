const ip = "";
let ipaddress ="";
if(ip == "")
{
    ipaddress = "localhost:8800";
}
else{
    ipaddress = ip+":8800";
}
export default ipaddress;
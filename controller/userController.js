const user=require("../model/userModel")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const sendVerificationCode=require("./sendVerificationEmail")
function getAlluser(req,res){
    user.findAll().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })  

}

async function createNewuser(req,res){
    let {name,email,password} =req.body;
     const salt=10
     try{
     await bcrypt.hash(password,salt,async(err,hash)=>{
         const [data, created] = await user.findOrCreate({
            where: { email }, 
            defaults: { name,password:hash} 
        });
   if(created){
    res.send(data);}
    else{
      res.send("user already exist") 
   }
    })

     }catch(error){
      console.log(error)
     }
        

   }
  


async function updateUser(req,res){
    let {name,email,password} =req.body;
    let id=req.params.id;

     const [affectedRows] = await user.update(
        { name,email,password},
        {
          where: {
           id
          },
        }, 
           
        );
   if(affectedRows>0){

    const updatedUser=await user.findByPk(id);
   
    return  res.status(202).send(updatedUser);
   }
   return res.status(402).send("the user was not found")    
}




function deleteUser(req,res){

    let id=req.params.id;
    user.destroy({
        where: {
          id
        }
      }).then((data)=>{
        if(data){
            res.status(202).send("user deleted successfully")
        }
        else{
            res.status(402).send("user not found")
        }
      }).catch((err)=>{
        res.status(402).send(err)
      })
}

async function login(req, res) {
  try {
      let { email, password } = req.body;
      let User = await user.findOne({ where: { email } });
      if (User) {
        
          const match = await bcrypt.compare(password, User.dataValues.password);
          if (match) {
              let token = jwt.sign({ id: User.dataValues.id }, process.env.secretkey, { expiresIn: "1d" });
              return res.send({ User, token });
          } else {
              return res.status(401).send("Incorrect password");
          }
      } else {
          return res.status(404).send("User not found");
      }
  } catch (err) {
      return res.status(500).send(err.message);
  }
}
// this code will be revisited , and updated
async function forgotPassword(req,res){
   
    const {newpass,email,vcode}=req.body; 
    const verifivation=sendVerificationCode(email);
    const User= user.findOne({where:{email}});
    if(User){
        if(vcode==sendVerificationCode(email)){
            const salt=10;
            await bcrypt.hash(newpass,salt,async(err,hast)=>{
                user.update({
                    where:{email}
                }).then(()=>{
                    res.status(202).send("password updated successfully")
                })
            })
        }
    }
    }
    

module.exports={
    getAlluser,createNewuser,updateUser,deleteUser,login 
}
const Standup=require('../../models/standup')

module.exports=function(router){
    //GET:the 12 newest stand-up meeting notes

    router.get('/standup',function(req,res){
       // res.send("hello");

       Standup.find({},(err,standup)=>{
           //check if error was found or not
           if(err){
               res.json({success:false,message:err});//return the error message
           }else{
               //check if standup was found in database
               if(!standup){
                   res.json({success:false,message:'no standup found.'});//return error of no standup found

               }else{
                   res.json({success:true,standup:standup});//return success and standup array

               }
           }
       })
    })

    //POST:Get new meeting note document...
    router.post('/standup',function(req,res){
        let note=new Standup(req.body)
        note.save(function(err,note){
            if(err){
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })
    router.delete('/deleteStandup/:id',(req,res)=>{
        //check if ID was provided in parameters
        if(!req.params.id){
            res.json({success:false,message:'no id provided'});//return error message
        }else{
            //check if id is found in database
            Standup.findOne({_id:req.params.id},(err,standup)=>{
                //check if errors was found
                if(err){
                    res.json({success:false,message:'Invalid id'})//return error message
                }else{
                    //remove the standup from database
                    standup.remove((err)=>{
                        if(err){
                            res.json({success:false,message:err});//return error message
                        }else{
                            res.json({success:true,message:'standup deleted'});//return error message
                        }
                    });
                }
            });
        }
    });

    router.put('/updateStandup',(req,res)=>{
        if(!req.body._id){
            res.json({success:false,message:'no standup id provided'});//return error message

        }else{
            Standup.findOne({_id:req.body._id},(err,standup)=>{
                if(err){
                    res.json({success:false,message:'not a valid standup id'});//return error message

                }else{
                    standup.teamMember=req.body.teamMember;
                    standup.project=req.body.project;
                    standup.workYesterday=req.body.workYesterday;
                    standup.workToday=req.body.workToday;
                    standup.impediment=req.body.impediment;
                    standup.createdOn=req.body.createdOn;
                    standup.save((err)=>{
                        if(err){
                            res.json({success:false,message:err});//return error message
                        }else{
                            res.json({success:true,message:'standup updated'});//return success message
                        }
                    });
                }
            });
        }
    });
  
}

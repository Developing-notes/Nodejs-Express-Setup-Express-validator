// const product = require("../models/product");
// exports.viewstores = async (req,res) =>{ 
//     const stores = product();
//     const {ProductId,Name,Description,Price} = req.body;
//      try {
//         const productlist = await product.findOne({ Name });
//         if (productlist)
//         {
//           return res.json({
//             success: false,
//             message: 'This product is already in use, try another product!',                        
//           });
//         }
//         else {
//             stores.ProductId = ProductId;
//             stores.Name = Name;
//             stores.Description =Description;
//             stores.Price = Price;

//             stores.save();
//             res.json({ success: true,msg:"Product insert successfully!!",stores});
//            //res.json(user);
//           }    
          
//         } catch (error) {
//           res.send('error inside viewstores method', error.message);
//           return false;
//         }
//       }

// exports.finding=(req,res)=>{
//     product.find(function (err, data) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     res.send(data);
//                 }
//             });
// }

// exports.remove= async (req,res)=>{
//     if(req.body.id==""){
//                 res.send("Please enter product id")
//             }
//             else{
//                 const id = req.body._id;

//                 const productlist = await product.findOne({id});
//         if (productlist){

//             product.findByIdAndDelete((req.body._id),
//                 function (err, data) {
//                     if (err) {
//                 res.json({success:false, msg:"Product not available!!",data:data})
//                     }
//                     else {
//                 res.json({success:true, msg:"Product deleted successfully!!",data:data})
//                 }
//                 }); 
//             }
//             else{
//                 res.json({success:false, msg:"Product not available!!",data:data})
//             }

//             }
            
// }
// exports.updating=(req,res)=>{
//     if(req.body.id==""){
//                 res.send("please enter product id") 
//             }
//             product.findByIdAndUpdate(req.body._id,
//                 {ProductId:req.body.ProductId, 
//                     Name: req.body.Name,Description:req.body.Description,Price:req.body.Price},
//                      function (err, data) {
//                     if (err) {
//                         console.log(err);
//                     }
//                     else {
//                         res.send(data);
//                     }
//                     })
                
// }

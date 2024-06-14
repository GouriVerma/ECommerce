const {Schema, model}=require("mongoose");
const validator=require("validator");

const orderSchema=new Schema({
    shippingDetails:{
        buildingInfo:{
            type:String,
            required:[true,"Please Enter buildingInfo"]
        },
        areaInfo:{
            type:String,
            required:[true,"Please Enter areaInfo"] 
        },
        city:{
            type:String,
            required:[true,"Please Enter city"]
        },
        pinCode:{
            type:Number,
            required:[true,"Please Enter pincode"]
        },
        state:{
            type:String,
            required:[true,"Please Enter State"]
        },
        country:{
            type:String,
            required:[true,"Please Enter Country"]
        },
        contactUserName:{
            type:String,
            required:[true,"Please Enter name"]
        },
        contactEmail:{
            type:String,
            required:[true,"Please Enter email"],
            validate:[validator.isEmail,"Please enter a valid email"]
        },
        contactPhoneNo:{
            type:Number,
            required:[true,"Please Enter Phone no"]
        }
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            image:{
                type:String,
                required:true,
            },
            size:{
                type:String,
                enum:["XS","S","M","L","XL","XXL"],
                required:true,
            },
            product:{
                type:Schema.Types.ObjectId,
                ref:"product",
                required:true,
            }
        }
    ],
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    paymentInfo:{
        id:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            required:true,
        },
        paidAt:{
            type:Date,
            
        }

    },

    priceDetails:{
        itemsPrice:{
            type:Number,
            required:true,
            default:0
        },
        shippingPrice:{
            type:Number,
            required:true,
            default:0
        },
        taxPrice:{
            type:Number,
            required:true,
            default:0
        },
        discountOnPrice:{
            type:Number,
            required:true,
            default:0
        },
        totalPrice:{
            type:Number,
            required:true,
            default:0
        },



    },
    orderStatus:{
        type:String,
        required:true,
        default:"Processing"
    },

    deliveredAt:{
        type:Date
    },



},{timestamps:true})

const Order=model("order",orderSchema);

module.exports=Order;






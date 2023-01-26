export const getCurrentProductCount = (cartData, _id)=>{
    let count = 0;
    cartData?.map((eachProduct)=>{
        if(eachProduct?._id === _id){
            count = eachProduct.count || 0;
        }
        return eachProduct;
    })
    return count;
}
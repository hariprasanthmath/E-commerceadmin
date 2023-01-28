export const findCartTotal = (cartData) => {
    var total = 0;
    let eachSum = cartData.map((eachProduct)=>{
       return total = eachProduct.price * eachProduct.count;
    })
    let result = eachSum.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0 )
    
    return result;
}
export const orderFilter = (orderData, filter)=>{
    if(filter === "all") return orderData;

    let resultData = orderData.filter((eachOrder)=>{
        if(eachOrder.status === filter){
            return eachOrder;
        }
    });

    return resultData;
}
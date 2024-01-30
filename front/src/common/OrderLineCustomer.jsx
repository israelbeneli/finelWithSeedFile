import { useEffect, useState } from "react"
import orderService from "../services/orderservice";
import { toast } from 'react-toastify';
import workerService from "../services/workerservice";
const OrderLineCustomer = ({order})=>{
const [workerNum,setworkerNum]=useState("")
const [PaidStatus,setPaidStatus]=useState(order.paidUp)
const [ProvidedStatus,setProvidedStatus]=useState(order.provided)

//משיכת שם הלקוח מהדאטה בייס 
useEffect(()=>{
    const fetchData = async()=>{

        let worker = await workerService.getWorkerById(order.worker);
        worker=worker.data;
        const workerNum = worker.workerNum;
        setworkerNum(workerNum);
    }
    fetchData();
},[order.worker, workerNum])
//חישוב כמות פריטים
let counter = 0;
order.prodacts.forEach(prodact => {
    counter += prodact.units;
});
//הפיכת הזמן שמופיע בשרת לפורמט של תאריך בלבד
const date = new Date(order.createdAt)
const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  //פונקציה שמעדכנת את ההזמנה בשרת על תשלום או אי תשלום בהזמנה
const handlePaidChackBox = async(orderId,status)=>{
    if(ProvidedStatus===false){
        const response = await orderService.getOrderById(orderId);
        const order = response.data;
        order.paidUp = status;
        orderService.updateOrder(order._id,order);
        setPaidStatus(status); 
    }
    else{
        toast.warn("לא ניתן לבטל תשלום לאחר שמוצר סופק")
    }

}
  //פונקציה שמעדכנת את ההזמנה בשרת על אספקה או אי אספקה של הזמנה
  const handleProvidedChackBox = async(orderId,status)=>{
    if (PaidStatus===true){
        const response = await orderService.getOrderById(orderId);
        const order = response.data;
        order.provided = status;
        orderService.updateOrder(order._id,order);
        setProvidedStatus(status);
    }
    else{
        toast.warn("לא ניתן לשחרר הזמנה שטרם שולמה")
    }

}

    return(<>
    <tr key={order.orderNum}>
          <td>{order.orderNum}</td>
          <td>{order.prodacts.length}</td>
          <td>{counter}</td>
          <td>{workerNum}</td>
          <td>{order.totalPrice}</td>
          <td>{formattedDate}</td>
          <td><input type="checkbox"  checked={PaidStatus} onChange={(e)=>handlePaidChackBox(order._id,e.target.checked)}></input></td>
          <td><input type="checkbox" checked={ProvidedStatus} onChange={(e)=>handleProvidedChackBox(order._id,e.target.checked)}></input></td>
        </tr>
    </>
    )
}
export default OrderLineCustomer;
import { useEffect, useState } from "react"

import { useAuth } from "../context/auth.context"
import workerService from "../services/workerservice"
import orderService from "../services/orderservice"
import OrderLine from "../common/OrderLine"
import { toast } from 'react-toastify';


const WorkerOrderListByWorker = ({workerToshow})=>{ 
    const [orders,setOrders]=useState([])
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                let workerDetails = await workerService.getWorkerById(workerToshow._id)
                const orders =workerDetails.data.orders;
                const realOrders = [];
                    for (let i=0;i<orders.length; i++){
                        const order = await orderService.getOrderById(orders[i]._id)
                        realOrders.push(order);
                    }
                setOrders(realOrders);
                }
            catch(e){
                toast.error(e)
            }    
                
        };
    fetchData();
    },[workerToshow]);
  
      
    return(
        <div className="container w-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>מספר הזמנה</th>
                        <th>כמות שורות</th>
                        <th>כמות פריטים</th>
                        <th>שם לקוח</th>
                        <th>סה"כ</th>
                        <th>תאריך קניה</th>
                        <th>שולם</th>
                        <th>סופק</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                            <OrderLine key={order.data.orderNum} order={order.data}></OrderLine>
                        ))}
                </tbody>
            </table>    
        </div>
        
    )
}
export default WorkerOrderListByWorker
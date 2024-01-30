import WorkerOrderListByWorker from "./WorkerOrderListByWorker";
import { useEffect, useState } from "react"
import workerService from "../services/workerservice"


const WorkersList = ()=>{
    const [workers , setWorkers] = useState([]);
    const [workerChuse,setWorkerChuse]=useState(null);
    useEffect(()=>{
        const fetchData = async()=>{
            let workersList = await workerService.getAll()
            workersList=workersList.data; 
            setWorkers(workersList);
        }
        fetchData();
    },[])
return(
    <>
    <h1>רשימת עובדים</h1>

    {workers.map(worker=>(
        <button className="btn btn-info m-1" onClick={()=>setWorkerChuse(worker)}>{worker.name}</button>
    ))}
    {workerChuse &&<> 
        <h3>רשימת הזמנות של : {workerChuse.name}</h3>
        <WorkerOrderListByWorker workerToshow={workerChuse}></WorkerOrderListByWorker>
        </>
    }
    </>
)
}
export default WorkersList
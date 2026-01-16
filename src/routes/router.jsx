import {createBrowserRouter} from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/home/Home";
import SignIn from "../pages/home/sign In/SignIn";
import SignUp from "../pages/home/sign up/SignUp";
import ErrorPage from "../pages/home/errorPage/ErrorPage";
import CreateAssignment from "../pages/home/Create Assignment/CreateAssignment";
import Assignments from "../pages/assignment/Assignments";
import ViewAssignment from "../pages/assignment/ViewAssignment";
import SubmitAssignment from "../pages/assignment/SubmitAssignment";
import MySubmittedAssignment from "../pages/assignment/MySubmittedAssignment";
import UpdateAssignment from "../pages/assignment/UpdateAssignment";
import PendingAssignment from "../pages/assignment/PendingAssignment";
import GiveMarks from "../give marks/GiveMarks";
import PrivateRoutes from "./PrivateRoutes";




export const router = createBrowserRouter([
{
    path : '/' ,
    Component : MainLayouts,
    errorElement : <ErrorPage></ErrorPage>,
    children :[
        {index : true , element : <Home></Home>},
        {path : '/signIn' , element : <SignIn></SignIn>},
        {path : '/signUp' , element : <SignUp/>},
        {path : '/createAssignment' , element : <PrivateRoutes><CreateAssignment></CreateAssignment></PrivateRoutes>},
        {path : '/assignments' , element:<Assignments></Assignments>},
        {path : '/viewAssignments/:id' , element:<PrivateRoutes><ViewAssignment></ViewAssignment></PrivateRoutes>},
        {path : '/submitAssignment/:id' , element:<PrivateRoutes><SubmitAssignment></SubmitAssignment></PrivateRoutes>},
        {path : '/attemptedAssignment' , element:<PrivateRoutes><MySubmittedAssignment></MySubmittedAssignment></PrivateRoutes>},
        {path : '/updateAssignment/:id' , element:<PrivateRoutes><UpdateAssignment></UpdateAssignment></PrivateRoutes>},
        {path : '/pendingAssignment' , element:<PrivateRoutes><PendingAssignment></PendingAssignment></PrivateRoutes>},
        {path : '/giveMarks/:id' , element:<PrivateRoutes><GiveMarks></GiveMarks></PrivateRoutes>},
        

       

        
    ] 
}
])
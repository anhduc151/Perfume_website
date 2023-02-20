import Navbar from "../../components/Navbar";
const DefaultLayout = ({children}) => {
    return ( 
        <div>
        <Navbar/>
        <div className="content">
            {children}
        </div>
        </div>
        
    );
}
 
export default DefaultLayout;
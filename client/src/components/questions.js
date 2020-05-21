import React, {useContext, useEffect, useState, useRef, useCallback} from 'react'

import StackOverflowContext from "../context/StackOverflowContext"
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
const QuestionEntries = () => {
    const stackOverContext = useContext(StackOverflowContext)

    const {getItems, questions, loading} = stackOverContext
   
    const [search, setSearch] = useState("")
  
    const SearchOnChange = e => {
        setSearch(e.target.value)
    }
   
   

    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }

    const [images, setImages] = useState([])
    const [pages, setPages] = useState(1)   
    
    useEffect(() => {
        axios
            .get(`/api?page=${pages}`)
            .then(res => setImages(res.data.items))
    })
    
    const fetchData = () => {
        setPages(prevPages => prevPages + 1)
        axios
            .get(`/api?page=${pages}`)
            .then(res => setImages(images.concat(res.data.items)))
    }
    
    const filteredQuestions = images && images.filter(item => {
        return item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      });

    return (
        <>
            <div className='container'>
                <div className="roW"> 
                <h1>StackOverflow Questions</h1>
                    <input className='form-control' type="text" onChange={SearchOnChange} placeholder="Search for Questions"></input>

                <div>
                <InfiniteScroll
                dataLength={filteredQuestions && filteredQuestions.length}
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                >
                    {filteredQuestions && filteredQuestions.map((item, index) => {
                        return(
                            <div className="card" key={item.question_id}>
                            <div className="card-item-1">
                                <a rel="noopener noreferrer" href={item.link} target="_blank"><strong>{item.title}</strong></a>
                            
                                <p className="card-item-1-label">asked {timeConverter(item.creation_date)}</p>
                            </div>
                            <div className="card-item-2">   
                                <label className="card-item-2-label">{item.owner.display_name}</label>
                                <img src={item.owner.profile_image} className="card-item-2-image" alt="avatar"></img>
                            </div>
                        </div>
                        )
                    })}
                 </InfiniteScroll>
                 
                </div>
                
                </div>

                
            </div>
        </>
    )
}

export default QuestionEntries

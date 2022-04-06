import {useState, useContext, useEffect} from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import {searchUsers} from '../../context/github/GithubActions';
import {getUsersSortInfo} from '../../context/github/GithubActions';

function UserSearch(){
  const [text, setText] = useState('');

  const [sortway, setSortway] = useState('sort');

  const {users, dispatch} = useContext(GithubContext);

  const {setAlert} = useContext(AlertContext);

  const handleChange = (e) => setText(e.target.value);

  useEffect(()=> {

    dispatch({type: 'SET_LOADING'});
    let userSortInfo = {};
    let userInfo;
    
    Promise.all(users.map( async (user) => {
      userInfo = await getUsersSortInfo(user.login);
      userSortInfo[user.login] = {repos:userInfo.repos,followers:userInfo.followers};
    })).then(() =>{
        let copyOfUsers = users; 
        // sort copyOfUsers by userSortInfo
        switch(sortway){
          case 'mostrepos':
            copyOfUsers.sort((a, b) => userSortInfo[b.login].repos - userSortInfo[a.login].repos);
            break;
          case 'leastrepos':
            copyOfUsers.sort((a, b) => userSortInfo[a.login].repos - userSortInfo[b.login].repos);
            break;
          case 'mostfollowers':  
            copyOfUsers.sort((a, b) => userSortInfo[b.login].followers - userSortInfo[a.login].followers);
            break;
          case 'leastfollowers':  
            copyOfUsers.sort((a, b) => userSortInfo[a.login].followers - userSortInfo[b.login].followers);
            break;
          default:
            break;
        };   

        dispatch({type:'UPDATE_USER_SORT', payload: copyOfUsers});      
    });

    
  },[dispatch,sortway]);
  
  const handleSortChange = (e) => {
      setSortway(e.target.value);
      dispatch({type:'CHANGE_SORT',payload: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(text === ''){
      setAlert('Please enter something','error');
    }else {
      dispatch({type:'SET_LOADING'});

      const users = await searchUsers(text);

      dispatch({type:'GET_USERS', payload: users});

      setText('');
    }
  }

  return <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
     <div>
      <form onSubmit={handleSubmit}>
       <div className="form-control">
         <div className="relative">
           <input 
             type="text" 
             className="w-full pr-40 bg-gray-200 input input-lg text-black"
             placeholder='Search'
             value={text}
             onChange={handleChange} 
           />
           <button type='submit' className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg' >
            Go 
           </button>            
         </div> 
       </div>
      </form> 
     </div>
     {users.length >0 && (
       <div>
         <button onClick={() => dispatch({ type:'CLEAR_USERS' })} className="btn btn-ghost btn-lg">
           Clear 
         </button>
            <select value={sortway} onChange={handleSortChange} className="select w-full select-lg max-w-xs">
              <option disabled  value='sort'>Sort:</option>
              <option value="mostrepos">Most Repos</option>
              <option value="leastrepos">Least Repos</option>
              <option value="mostfollowers">Most Followers</option>
              <option value="leastfollowers">Least Followers</option>
            </select>                         
       </div>
     )}
   </div>;
}

export default UserSearch;
import React, {useContext, useState} from 'react';
import Drawer from '../HOC/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination';
import BlogCard from '../Organisms/BlogCard'
import {store} from '../Store/Store';
import { useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    wrapper: {
        padding: 25,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    grid: {
        display: 'flex',
        justifyContent: "center"
    },
    pagination: {
        marginTop: 50
    },
    fab: {
      right: 20,
      position: 'fixed',
      bottom: 20,
      color: '#FFF'
    }
    
})

const maxBlogs = 4

const ViewAll = () => {
    const classes = useStyles();
    const {state} = useContext(store);
    const [data, setData] = useState(state);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    let history = useHistory()

    const handleView = (id) => {
        history.push(`/view/${id}`);
    }

    const createBlogsCards = function() {
        if (data.length > 0) {
            return (
                data.map((data, index) => {
                    if (index <= maxBlogs - 1) {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3} className={classes.grid}>
                                <BlogCard overflowWrap={false} hasView onView={handleView.bind(this, data.id)} name={data.name} title={data.title} content={data.content} />
                            </Grid>
                        )
                    } else {
                        return null
                    }
                })
            )
        } else {
            return <p>no blog available</p>
        }
    }
    
    const handleCreate = () => {
        history.push(`/create`);
    }

    const handlePagination = (event, value) => {
        setPage(value);

        let filterState = state.filter((curr) => {
            return curr.title.indexOf(search) > -1
        })

        let filteredData = (search.length < 3) ? state : filterState 

        let paginated = filteredData.reduce((acc, curr, i) => {
            if ( !(i % maxBlogs)  ) {
              acc.push(filteredData.slice(i, i + maxBlogs));
            }
            return acc;
        }, []);
        
        setData(paginated[value -1 ]);
    }

    const handleChange = (event) => {
        setSearch(event.target.value)
        if (event.target.value.length >= 3) {
            let filtered = state.filter((curr) => {
                return curr.title.indexOf(event.target.value) > -1
            })
            
            setData(filtered);
        } else {
            setData(state)
        }

        setPage(1);
    }

    const pageCount = () => {
        let filtered = state.filter((curr) => {
            return curr.title.indexOf(search) > -1
        })

        if (search.length >= 3) {
            return Math.ceil(filtered.length / maxBlogs)
        } else {
            return Math.ceil(state.length / maxBlogs)
        }
    }
    return (
        <div className={classes.wrapper}>
            { state.length > 0 ? <TextField value={search} onChange={handleChange} style={{marginBottom: 30}} id="search" label="Search Title" fullWidth/> : null}
            <Grid container spacing={3} justify="center">
               {
                  createBlogsCards() 
               }
            </Grid>
            <Grid container spacing={3} justify="center">
                {
                    pageCount() >= 2 ? <Pagination page={page} onChange={handlePagination} className={classes.pagination} count={pageCount()} color="primary" /> : null
                }
            </Grid>
            <Fab color="primary" onClick={handleCreate} aria-label="add" className={classes.fab}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default Drawer(ViewAll);
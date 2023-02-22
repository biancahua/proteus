import React, { useState, useEffect, useContext } from 'react';
import '../Styles/archive.css';
import { ArchiveJob } from './ArchiveJob';
import { ArchiveJobHover } from './ArchiveJobHover';
import { Dropdown } from './Dropdown';
import { ThemeContext } from '../ThemeContext';

export const Archive = () => {
  const [history, setHistory] = useState([]);
  const [hover, setHover] = useState({});
  const archiveArray: React.ReactElement[] = [];
  const [filter, setFilter] = useState('All');
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const jobArray = await window.electronAPI.fetchAllJobs();
        setHistory(jobArray);
      } 
      catch (e) { 
        console.log(e)
      }
    }
    fetchAllJobs();
  },[]);

  const renderHover = (name, runtime, node, instance, cronjob_name, x, y): void => {
    if(!name) setHover({...hover, active:false});
    else setHover({name, runtime, node, instance, cronjob_name, x: x+250, y: y-70, active: true});
  }

  const onFilterChange = (input: string): void => {
    setFilter(input);
  }
  
  for (let i = 0; i < history.length; i++) {
    if (filter === 'All') {
        archiveArray.push(
          <ArchiveJob metrics={history[i]} renderHover={renderHover} key={history[i].kube_name}  />
        )
    } else if (filter === 'Succeeded' && history[i].kube_job_status_succeeded) {
        archiveArray.push(
            <ArchiveJob metrics={history[i]} renderHover={renderHover} key={history[i].kube_name}  />
          )
    } else if (filter === 'Failed' && !history[i].kube_job_status_succeeded) {
        archiveArray.push(
            <ArchiveJob metrics={history[i]} renderHover={renderHover} key={history[i].kube_name}  />
          )
    } 
  }

    return (
      <div className='archive-container'>
        <div className="archive-title">
          <div style={{backgroundColor: theme.textPrimary}} className='archive-title-item' style={{backgroundColor: theme.textPrimary}}><b style={{color: theme.textSecondary}}>cluster:</b> <b style={{color: theme.logo}}>eks-cluster-01</b></div>
        </div>
        <div className='archive-data'>
          <div className='dropdown-list'>
            <Dropdown onFilterChange={onFilterChange}/>
          </div>
          <div style={{color: theme.textPrimary}} className="data-types">
            <div><b>Name:</b></div>
            <div><b>Namespace:</b></div>
            <div><b>Start Time:</b></div>
            <div><b>End Time:</b></div>
            <div><b>Success? </b></div>
          </div>
          <div style={{backgroundColor: theme.bgSecondary, border: `2px solid ${theme.borderPrimary}`}} className="archive-job-list">
           {archiveArray}
          </div>
        </div>
        {hover.active && <ArchiveJobHover
         name={hover.name} runtime={hover.runtime} cronjob_name={hover.cronjob_name}
         node ={hover.node} instance={hover.instance} x={hover.x} y={hover.y}/>}
      </div>
    )
  }

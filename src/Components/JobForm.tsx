import React, { useRef, useState, useEffect } from 'react';
import '../Styles/archive.css';


// const Commands = () => {
//   return (
//     <div>
//     </div>
//   )
// }


export const JobForm = (props) => {
  const [ commandList, setCommandList ] = useState(['dog', 'cat', 'pig']);
  const [ restartPolicy, setRestartPolicy ] = useState('')
  const commandRef = useRef();
  const apiVersionRef = useRef();
  const jobNameRef = useRef();
  const imageNameRef = useRef();
  const imageURLRef = useRef();
  const backoffLimitRef = useRef();

  // const { handleSubmit } = props;

  // handles form submission
  const handleSubmit = async (e, kind: string) => {
    e.preventDefault();
    const form = `
      apiVersion: ${apiVersionRef.current.value}
      kind: ${kind}
      metadata: 
        name: ${jobNameRef.current.value}
      spec: 
        template:
          spec:
            containers:
            - name: ${imageNameRef.current.value}
              image: ${imageURLRef.current.value}
              command: [${commandList}]
            restartPolicy: ${restartPolicy}
        backoffLimit: ${backoffLimitRef.current.value}
    `
    // window.electronAPI.submitJob(form);
    alert(`submitted ${kind} form: ${form}`)
    
    // fetch('API', form)
    //   .then(response => response.json())
    //   .then(response => alert(`submitted ${kind} form`))
    //   .catch(err => alert(err))
    
  }



  // handles restart policy selection
  // const handleRestartPolicy = (e, kind: string) => {

  // }
  console.log('restartPolicy is ', restartPolicy);
  
  // Handles array of commands
  const addCommand = (input): any => {
    console.log('input is ', input);
    if (!commandList.includes(input)) {
      const newCommandList: Array<string> = [...commandList];
      newCommandList.push(input);
      setCommandList(newCommandList);
      console.log(`submitted ${input} to command list`);
      console.log('new command list is ', newCommandList);
    } else alert(`command "${input}" already exists`)
  };

  const deleteCommand = (index: number): void => {
    console.log(`deleting ${commandList[index]} from commandList`);
    const newCommandList = [...commandList];
    newCommandList.splice(index,1);
    setCommandList(newCommandList)
  }

  console.log('updated commandlist is ', commandList);

  const commandArray = [];
  for (let i = 0; i < commandList.length; i++) {
    commandArray.push(<button type="button" index={i} onClick={() => deleteCommand(i)}>{commandList[i]}&nbsp;&nbsp; x</button>)
  }
  // end of command array handling

  return (
    <div className="job_form">
      <h1>JOB</h1>
      <form onSubmit={(e) => handleSubmit(e, 'Job')} >
        <fieldset>
          <label><strong>JOB NAME:&nbsp;&nbsp;&nbsp;&nbsp;</strong></label> 
          <input ref={jobNameRef} placeholder="Job Name"></input>
        </fieldset>
        <fieldset>
          <label><strong>API VERSION:&nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input ref={apiVersionRef} placeholder="API VERSION" type='text'></input>
        </fieldset>
        <fieldset>
          <label>
            <strong>CONTAINERS</strong>
            <div>
              {/* Might make this a component so we can add to array of containers */}
              <label>IMAGE NAME:&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input ref={imageNameRef} placeholder="image name" type="text"></input><br></br>
              <label>URL:&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input ref={imageURLRef} placeholder="DOCKER image URL" type="url"></input><br></br>
              <div>
                {/* Might make this a component so we can add to the array of commands */}
                <label>COMMANDS:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input ref={commandRef} placeholder="command" id="command_item" name="command_item" type="text"></input>
                {commandArray}
                <button type="button" className="add_command" onClick={() => addCommand(commandRef.current.value)}>Add</button>
              </div>
            </div>

          </label>
        </fieldset>
        <fieldset>
          <label className="restart_policy" ><strong>RESTART POLICY: &nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input type="radio" id="Never" value='Never' name='restartJob' onClick={() => setRestartPolicy('Never')}></input>&nbsp;<label htmlFor="Never">Never</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="OnFailure" value='OnFailure' name='restartJob' onClick={() => setRestartPolicy('OnFailure')}></input>&nbsp;<label htmlFor="OnFailure">OnFailure</label>&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="Always" value='Always' name='restartJob' onClick={() => setRestartPolicy('Always')}></input>&nbsp;<label htmlFor="Always">Always</label>&nbsp;&nbsp;&nbsp;&nbsp;
        </fieldset>
        <fieldset>
          <label><strong>BACKOFF LIMIT: &nbsp;&nbsp;&nbsp;&nbsp;</strong></label>
          <input ref={backoffLimitRef} type="number" min='0' placeholder="number"></input>
        </fieldset>
        <input className='jobSubmitButton' type='submit' value='Submit Job'/>
      </form>
    </div>
  )
}
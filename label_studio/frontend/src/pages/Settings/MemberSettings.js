import React, { useCallback, useContext, useState, useEffect} from 'react';
import { Button } from '../../components';
// import {Card} from '../../components';
import { Form, Input, TextArea,  Select} from '../../components/Form';
// import { RadioGroup } from '../../components/Form/Elements/RadioGroup/RadioGroup';
import { ProjectContext } from '../../providers/ProjectProvider';
// import { Block } from '../../utils/bem';
// import { CurrentUserContext } from '../../providers/CurrentUser';
import { useAPI } from '../../providers/ApiProvider';
// import DatatablePage from '../../components/Table/Table';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import 'bootstrap/dist/css/bootstrap.min.css';

import './Table.css';
import { add } from 'date-fns';



export const MemberSettings = () => {
  const {project, fetchProject} = useContext(ProjectContext);
  const api = useAPI();

  const updateProjectclick = useCallback(() => {
    if (confirm('Are you sure add this member to your project?')) {
      if (project.id){
        fetchProject(project.id, true).then(result => {
          let id = result.task_of_id;
          let listButtons = $('.ls-button-add');
          for(let j = 0; j < listButtons.length; j++){
            if(!listButtons[j].hasAttribute('id')){
              listButtons[j].setAttribute('id',`button-add-${j}`)
            }
          }
          for(let i = 0; i < listButtons.length; i++){
            let button = $(`#button-add-${i}`);
            if(id == users[i].id){
              button.css('background-color','#3CB371');
              button.html('✓');
            }else{
              button.css('background-color','#09f');
              button.html('+');
            }
          }
        })
      }
    } else {
    }
  }, [project]);

  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(
    async () => {
      const response = await api.callApi("users");

      if (response) {
        response.forEach(ele => {
          if (ele.username!=''){
            users.push(ele);
          }
        });
        setUsers(users);
      }
    },
    [api]);
  
  useEffect(() => {
    fetchUsers();
    fetchProject(project.id, true).then(result => {
      let listButtons = $('.ls-button-add');
      for(let j = 0; j < listButtons.length; j++){
        if(!listButtons[j].hasAttribute('id')){
          listButtons[j].setAttribute('id',`button-add-${j}`)
        }
      }
      let id = result.task_of_id;
      for(let i = 0; i < listButtons.length; i++){
        let button = $(`#button-add-${i}`);
        if(id == users[i].id){
          button.css('background-color','#3CB371');
          button.html('✓');
        }else{
          button.css('background-color','#09f');
          button.html('+');
        }
      }
    })

  },  []);


  const columns = [
  {
    dataField: 'id',
    text: 'Id',
    hidden: true,
  },{
    dataField: 'username',
    text: 'User Name',
    filter: textFilter()
  },{
    dataField: 'email',
    text: 'Email',
    filter: textFilter()
  },{
    dataField: '',
    text: 'Choose member for project',
    formatter: (cell, row) => {
          return <Form action="updateProject"
          formData={{...project}}
          params={{pk: project.id}}
          onSubmit={updateProjectclick}>
            <Form.Actions>
              <TextArea
              name="task_of_id"
            />
              <Button className = 'button-add' type="submit" look="primary" onMouseMove={() => {$('.ls-textarea').val(row.id);}}>+</Button>
            </Form.Actions>
          </Form>
  },
  }];

  return (
    <div style={{width: '100%'}} >
      <div id="table-custom">
            <BootstrapTable
              keyField="id"
              data={users}
              columns={columns}
              filter={filterFactory()}
            />
          </div>
    </div>
  );
};

MemberSettings.title = "Member";
MemberSettings.path = "/member";

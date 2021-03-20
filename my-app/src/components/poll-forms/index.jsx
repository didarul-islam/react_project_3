import React from 'react'
import shortid from'shortid'
import Form from './Form'

const defaultOptions=[
    {id:shortid.generate(),value:'',vote:''},
    {id:shortid.generate(),value:'',vote:''}
]

class PollForm extends React.Component{

    state={
        title:'',
        description:'',
        options:defaultOptions,
        errors:{}

    }

    componentDidMount(){
        const {poll}=this.props
        if(poll && Object.keys(poll).length>0){
            this.setState({
                title:poll.title,
                description:poll.description,
                options:poll.options
            })
        }
    }

    handleChange=event=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleOptionsChange=(event,index)=>{
        const {options}=this.state
        options[index].value=event.target.value
        this.setState({options})

    }

    createOption=()=>{
        const{options}=this.state
        if(options.length<5){
            options.push({
                id:shortid.generate(),
                value:'',
                vote:0
                
            })
            this.setState({options})
        }else{
            alert('You can create max 5 options')
        }
    }

    deleteOption=(index)=>{
        const{options}=this.state
        if(options.length>2){
            options.slice(index,1)
            this.setState({options})
        }else{
            alert('You must have at least two options')
        }
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const {isValid,errors}=this.validate()

        if(isValid){
            const {title,description,options}=this.state
            const poll={
                title,
                description,
                options
            }
            if(this.props.isUpdate){
                poll.id=this.props.poll.id
                this.props.submit(poll)
                alert('Update Successfully')
            }else{
                this.props.submit(poll)
                event.target.reset()
                this.setState({
                title:'',
                description:'',
                options:defaultOptions,
                errors:{}
            })
            }
           
        }else{
            this.setState({errors})
        }
    }

    validate=()=>{
        const errors={}
        const {title,description,options}=this.state
        if(!title){
            errors.title='Please provide a Title'
            
        }else if(title.length<20){
                errors.title='Title too short'
            }else if(title.length>100){
                errors.title='Title too long'
            }
        if(!description){
            errors.description='Please provid a Description'
        }else if(description.length>500){
            errors.description='Description too long '
        }
        const optionsErrors=[]
        options.forEach((opt,index)=>{
            if(!opt.value){
                optionsErrors[index]='Option text Empty'
            }else if(opt.value.length>100){
                optionsErrors[index]='Options text too Long'
            }
        })
        if(optionsErrors.length>0){
            errors.options=optionsErrors
        }
        return{
            errors,
            isValid:Object.keys(errors).length==0
        }

    }
    render(){
        const {title,description,options,errors}=this.state
        return(
         <Form

        title={title}
        description={description}
        options={options}
        buttonValue={this.props.buttonValue || 'create Poll'}
         errors={errors}
        handleChange={this.handleChange}
        handleOptionsChange={this.handleOptionsChange}
        createOption={this.createOption}
        deleteOption={this.deleteOption}
        handleSubmit={this.handleSubmit}
         />
        )
       
    }

}
export default PollForm
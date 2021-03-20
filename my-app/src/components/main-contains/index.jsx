import React from 'react'
import {Modal,ModalHeader,ModalBody} from 'reactstrap'
import ParticipentFrom from './particepant-from'
import PollForm from '../poll-forms'

class MainContent extends React.Component{

    state={
        openModal:false
    }

toggleModal =()=>{
    this.setState({
        openModal:!this.state.openModal
    })
}
    render(){
        if(Object.keys(this.props.poll).length==0){
           return(
            <div>
                <h3>Welcome to my Application</h3>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
            </div>
           ) 
        }
        const {poll,getOpinion,updatePoll,deletePoll}=this.props
        return(
            <div>
                <h3>{poll.title}</h3>
                <p>{poll.description}</p>
                <br/>
                <ParticipentFrom
                poll={poll}
                getOpinion={getOpinion}
                toggleModal={this.toggleModal}
                deletePoll={deletePoll}
                />
                <Modal 
                isOpen={this.state.openModal}
                toggle={this.toggleModal}
                unmountOnClose={true}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Update Poll
                    </ModalHeader>
                        <ModalBody>
                            <PollForm
                            poll={poll}
                            isUpdate={true}
                            submit={updatePoll}
                            buttonValue='Update Poll'
                            />
                        </ModalBody>

                    

                </Modal>
            </div>
        )
    }

}

export default MainContent
//root.js
import React, { Component } from 'react'
import { connect } from "react-redux"
import { action1 } from "../redux/actions"
import Layout from "./layout"
import PostAdmin from "./postAdmin"

class Root extends Component {
  state = {}

  componentDidMount(){
    this.props.action1(777)
  }

  render(){
    console.log("this.props",this.props)
    return (
      <div>
        <Layout>
          <PostAdmin />
        </Layout>
      </div>
    )//return
    
  }//Render

}//class Root

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = {
  action1
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
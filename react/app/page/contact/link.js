import React from 'react'
// 引入编辑器以及EditorState子模块
import BraftEditor, { EditorState } from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

export default class EditorDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {editorState:''};
        this.handleEditorChange=this.handleEditorChange.bind(this);
    }

    handleEditorChange(editorState){
       // alert(editorState)
        this.setState({editorState:editorState} )
    }

    render () {
        // 通过ref属性来将编辑器实例赋值给this.editorInstance
        return <BraftEditor ref={instance => this.editorInstance = instance} onChange={this.handleEditorChange} />
    }

}
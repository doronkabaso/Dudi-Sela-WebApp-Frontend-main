import React from 'react'
import useCollapse from 'react-collapsed'

export const Collapsible = (props) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
return (
    <div className="collapsible">
        <div className="header" {...getToggleProps()}>
            {isExpanded ? 'Collapse' : 'Expand'}
        </div>
        <div {...getCollapseProps()}>
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
    )
}
// use example
// function App() {
//     return (
//     <Collapsible>
//         Now you can see the hidden content. <br/><br/>
//         Click <i>Collapse</i> to hide everything... <br/><br/>
//         <Collapsible>
//             Now you can see the hidden content. <br/><br/>
//             Click <i>Collapse</i> to hide this content...
//         </Collapsible>
//     </Collapsible>
//     )
// }
// export default App
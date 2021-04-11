import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showForm }) => {
    
    return (
        <header className='header'>
            <h1 >{title}</h1>{/* one way of styling is like css, remember to double curly bracket like this: style={{color: 'red', backgroundColor: 'green'}} */}
            <Button color = {showForm ? 'red' : 'green'} 
            text={showForm ? 'Close' : 'Add a new task'} 
            onClick= {onAdd} />
        </header>
    )
}

//Default prop if not passed
Header.defaultProps = {
    title: 'Task Tracker',
}

//Defines what is the type for the prop
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

//Can also use a variable to style like this and pass it using style={headingStyle}, tipically used with dynamic styling
/*const headingStyle = {
    color: 'red', 
    backgroundColor: 'green'
}*/

export default Header

import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToId } from '../../lib/scroll'

/**
 * Section links that work from any page: scroll on home, otherwise navigate
 * to home and jump once the section exists.
 */
export default function SectionLink({ id, className = '', children, onClick, ...rest }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (event) => {
    onClick?.(event)
    if (location.pathname === '/') {
      event.preventDefault()
      scrollToId(id)
      window.history.replaceState(null, '', `/#${id}`)
    } else {
      event.preventDefault()
      navigate(`/#${id}`)
    }
  }

  return (
    <a href={`/#${id}`} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

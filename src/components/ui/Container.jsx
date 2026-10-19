export default function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`shell ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

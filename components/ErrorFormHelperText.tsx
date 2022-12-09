function ErrorFormHelperText({ error }: { error: string | null | undefined }) {
  return <p className='text-xs text-red-500 '>{error ? "*" + { error } : null}</p>
}
export default ErrorFormHelperText

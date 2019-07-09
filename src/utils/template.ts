export default function template(tpl: string) {
  if (tpl.match(/^https?:\/\//)) {
    return tpl
  }

  return `tacer-template-${tpl}`
}

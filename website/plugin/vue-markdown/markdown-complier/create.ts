import MarkdownIt from "markdown-it"
import { changeRule } from "./fence"

const md =  new MarkdownIt({})
changeRule(md)

export default md

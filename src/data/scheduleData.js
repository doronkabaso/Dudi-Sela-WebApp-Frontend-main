import { GridEditSingleSelectCell } from '@mui/x-data-grid';
//useGridApiContext

const onValueChange = (e, props) => {
  props.row[props.field]=e.target.value
  props.handleValueChange(props.row)
}

export const CustomTypeEditComponent = (props) => {
  return <GridEditSingleSelectCell  value={props.value} {...props} onValueChange={(e) => onValueChange(e, props)} />
}
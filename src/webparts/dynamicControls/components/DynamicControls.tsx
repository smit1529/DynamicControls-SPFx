import * as React from 'react';
import styles from './DynamicControls.module.scss';
import { IDynamicControlsProps } from './IDynamicControlsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { Button, ButtonType, DatePicker, TextField, Dropdown } from 'office-ui-fabric-react';

export interface IDynamicControlsState {
  controlArray: ControlProps[];
}

export interface ControlProps {
  id: string;
  textField: string;
  dropDown: string;
  datePicker: string;
}

export default class DynamicControls extends React.Component<IDynamicControlsProps, IDynamicControlsState> {
  constructor(props: IDynamicControlsProps, STATE: IDynamicControlsState) {
    super(props);

    this.state = {
      controlArray: []
    };
  }

  public dropDownHandleChange = (value, index) => {
    var cntrlIndex = index.toString();
    var dropSelectedItem = value;

    let values = [...this.state.controlArray];
    values[cntrlIndex]["id"] = cntrlIndex;
    values[cntrlIndex].dropDown = dropSelectedItem;

    this.setState({ controlArray: values });
  }

  public textFieldHandleChange = (event) => {
    var cntrlId = event.target.id;
    var cntrlIndex = cntrlId.substr(cntrlId.lastIndexOf("_") + 1);
    var cntrlVal = event.target.value;

    let values = [...this.state.controlArray];
    values[cntrlIndex]["id"] = cntrlIndex;
    values[cntrlIndex].textField = cntrlVal;

    this.setState({ controlArray: values });
  }

  public dateHandleChange = (value, index) => {
    var cntrlIndex = index.toString();
    var dateSelectedItem = value.toString();

    let values = [...this.state.controlArray];
    values[cntrlIndex]["id"] = cntrlIndex;
    values[cntrlIndex].datePicker = dateSelectedItem;

    this.setState({ controlArray: values });
  }

  public onAddFilterClick = (event) => {
    this.setState((prevState) => ({
      controlArray: [...prevState.controlArray, { id: "-1", textField: "", dropDown: "0", datePicker: "" }]
    }));
  }

  public onSubmitClick = (event) => {
    alert("Open Console !!");
    console.log([...this.state.controlArray]);
  }

  public render(): React.ReactElement<IDynamicControlsProps> {
    var dropDownOption = [{ key: "0", text: 'Select Item' }, { key: "1", text: 'Item 1' }, { key: "2", text: 'Item 2' }, { key: "3", text: 'Item 3' }];

    return (
      <div id="parentDiv">
        <Button buttonType={ButtonType.primary} onClick={this.onAddFilterClick}>Add Control</Button>

        {this.state.controlArray.map((itemVal, index) => {
          return (
            <div key={index}>
              <TextField label="Text Field" id={"TextField_" + index} placeholder="Text Field Placeholder." value={itemVal.textField} onBlur={this.textFieldHandleChange} />
              <Dropdown label="Drop Down" id={"Dropdown_" + index} options={dropDownOption} defaultSelectedKey={itemVal.dropDown} onChanged={(e) => this.dropDownHandleChange(e.key, index)} />
              <DatePicker label="Date Picker" onSelectDate={(e) => this.dateHandleChange(e, index)} value={new Date(itemVal.datePicker)} />
              <br></br>
            </div>
          );
        })}

        <Button buttonType={ButtonType.normal} onClick={this.onSubmitClick}>Show Details</Button>
      </div>
    );
  }
}

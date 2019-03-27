import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'DynamicControlsWebPartStrings';
import DynamicControls from './components/DynamicControls';
import { IDynamicControlsProps } from './components/IDynamicControlsProps';

export interface IDynamicControlsWebPartProps {
  description: string;
}

export default class DynamicControlsWebPart extends BaseClientSideWebPart<IDynamicControlsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDynamicControlsProps > = React.createElement(
      DynamicControls,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

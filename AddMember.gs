// Casey Hillers' Venturing Management Tools: Tools to help Venture Crews manage themselves
// Copyright (C) 2015 Casey Hillers
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

//Add Member Script

//Shows the addMember side bar
function addMemberForm()
{
  var html = HtmlService.createHtmlOutputFromFile('addMember').setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('Add Crew Member');
  SpreadsheetApp.getUi().showSidebar(html);
}

//Processes data from the addMember side bar to be used by the script
function processAddMemberForm(data)
{
  var member_index = memberIndex(data);
  insertMember(data, member_index);
}

//Returns where the member should be in the crew (alphabetical order)
function memberIndex(name)
{  
  var index = -1;
  
  for (var i = 2; i < contact_sheet.getMaxRows(); i += 3)
  {
    index++;
    if ( name < contact_sheet.getSheetValues(i, 1, 1, 1))
    {
      break;
    }
  }
  return index;
}

//Inserts the member across all the sheets with proper formatting
function insertMember(name, index)
{
  //Contact Sheet
  contact_sheet.insertRowsBefore(2 + (index * 3), 3);
  var color_cells = contact_sheet.getRange(4 + (index * 3), 1, 1, 7);
  color_cells.setBackground("#E0E0E0");
  var cell = contact_sheet.getRange(2 + (index * 3), 1);
  cell.setValue(name);
  
  //Advancement Sheet
  advancement_sheet.insertRowsBefore(6 + (index * 2), 2)
  var color_cells = advancement_sheet.getRange(7 + (index * 2), 1, 1, advancement_sheet.getMaxColumns());
  color_cells.setBackground("#E0E0E0");
  color_cells = advancement_sheet.getRange(6 + (index * 2), 2, 1, 5);
  color_cells.clearFormat();
  color_cells = advancement_sheet.getRange(6 + (index * 2), 8, 1, 12);
  color_cells.clearFormat();
  color_cells = advancement_sheet.getRange(6 + (index * 2), 21, 1, 13);
  color_cells.clearFormat();
  var cell = advancement_sheet.getRange(6 + (index * 2), 1);
  cell.setValue(name);
  
  //Attendance Sheet
  attendance_sheet.insertRowsBefore(4 + (index * 2), 2);
  var color_cells = attendance_sheet.getRange(5 + (index * 2), 1, 1, attendance_sheet.getMaxColumns());
  color_cells.setBackground("#E0E0E0");
  color_cells = attendance_sheet.getRange(4 + (index * 2), 2, 1, attendance_sheet.getMaxColumns());
  color_cells.clearFormat();
  var cell = attendance_sheet.getRange(4 + (index * 2), 1);
  cell.setValue(name);
  
  //Service Sheet
  service_sheet.insertRowsBefore(6 + (index * 2), 2);
  var color_cells = service_sheet.getRange(7 + (index * 2), 1, 1, service_sheet.getMaxColumns());
  color_cells.setBackground("#E0E0E0");
  color_cells = service_sheet.getRange(6 + (index * 2), 2, 1, service_sheet.getMaxColumns() - 2);
  color_cells.clearFormat();
  var cell = service_sheet.getRange(6 + (index * 2), 1);
  cell.setValue(name);
  
  //Dues Sheet
  dues_sheet.insertRowsBefore(5 + (index * 2), 2);
  var color_cells = dues_sheet.getRange(6 + (index * 2), 1, 1, dues_sheet.getMaxColumns());
  color_cells.setBackground("#E0E0E0");
  color_cells = dues_sheet.getRange(5 + (index * 2), 2, 1, dues_sheet.getMaxColumns());
  color_cells.clearFormat();
  var cell = dues_sheet.getRange(5 + (index * 2), 1);
  cell.setValue(name);
}

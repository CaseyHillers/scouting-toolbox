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

//Values for the Crew Google Drive

//Crew Sheets
var ss = SpreadsheetApp.getActiveSpreadsheet();
var contact_sheet = ss.getSheetByName("Contact Information");
var advancement_sheet = ss.getSheetByName("Advancement");
var attendance_sheet = ss.getSheets()[2];
var service_sheet = ss.getSheetByName("Service");
var dues_sheet = ss.getSheets()[4];

//Returns how many crew members are in the crew
function CrewSize()
{
 var size = 0;
 for (var i = 1; i < contact_sheet.getMaxRows(); i += 3)
 {
   size++;
   if ("Advisor Name" === contact_sheet.getSheetValues(i, 1, 1, 1))
     break;
 }
 return size;
}

//Returns array of crew members
function getMemberList()
{
  var list = new Array();
  
  for (var i = 0; i < CrewSize(); i++)
  {
    list.push(contact_sheet.getSheetValues(0, 2 + (i * 3), 1, 1));
  }
}

//Takes in the records format of names, and returns it into a first last format
function FirstLast(name)
{
  return name.substr(name.indexOf(',') + 1, name.length) + " " + name.substr(0, name.indexOf(','));
}

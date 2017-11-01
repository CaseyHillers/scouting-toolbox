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

//Object for handling the UI, DON'T MESS WITH
var ui = SpreadsheetApp.getUi();

function onOpen() 
{
  ui.createMenu('Officers')
      .addSubMenu(ui.createMenu('Treasurer')
                  .addItem('Treasury Report [WIP]', 'treasurerUI')
                 )
      .addSubMenu(ui.createMenu('VP of Administration')
                  .addItem('Add member', 'addMemberForm')
                  .addItem('Remove member [WIP]', 'helpUI')
                  .addItem('Advancement Report [WIP]', 'advancementReportForm')
                  .addItem('Attendance Report [WIP]', 'helpUI')
                 )
      .addSubMenu(ui.createMenu('VP of Communication')
                  .addItem('Email list [WIP]', 'EmailListUI')
                 )
      .addItem('Help', 'helpUI')
      .addToUi();
}

function helpUI() 
{
  ui.alert("This is an assortment of tools built by Casey Hillers to ease crew officers with their tasks on the Google Drive. If you have any questions, concerns, or requests, please contact Casey Hillers."); 
}

<!--

    Copyright (C) 2013 salesforce.com, inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<aura:application>
	<aura:attribute name="testPanelType"    type="String"  default="modal"/>
	<aura:attribute name="testTitle"        type="String"  default="New Panel"/>
	<aura:attribute name="testDisplayTitle" type="Boolean" default="true"/>
	<aura:attribute name="testClass"        type="String"/>
	<aura:attribute name="testFlavor"       type="String"/>
	<aura:attribute name="testIsVisible"    type="Boolean" default="true"/>
	<aura:attribute name="testStartOfDialogLabel" type="String"  default="Start of Dialog"/>
	<aura:attribute name="testCloseOnClickOut"    type="Boolean" default="false"/>
	<aura:attribute name="testShowCloseButton"    type="Boolean" default="true"/>
	<aura:attribute name="testCloseDialogLabel"   type="String"  default="Close"/>
	<aura:attribute name="testUseTransition"      type="Boolean" default="true"/>
	<aura:attribute name="testAnimation"    type="String"  default="bottom"/>
	<aura:attribute name="testAutoFocus"    type="Boolean" default="true"/>
	<aura:attribute name="testDirection"    type="String"  default="north"/>
	<aura:attribute name="testShowPointer"  type="Boolean" default="false"/>
	<aura:attribute name="testReferenceElement"         type="Object"/>
	<aura:attribute name="testUseReferenceElement"      type="Boolean" default="false"/>
	<aura:attribute name="testReferenceElementSelector" type="String"/>
	<aura:attribute name="testUseHeader"    type="Boolean" default="false"/>
	<aura:attribute name="testUseFooter"    type="Boolean" default="false"/>
	<aura:attribute name="testPanelHeader"  type="Aura.Component[]"/>
	<aura:attribute name="testPanelFooter"  type="Aura.Component[]"/>
	<aura:attribute name="testMakeScrollable"	 type="Boolean" default="false"/>
	<aura:attribute name="nonScrollable"	 type="Boolean" default="false"/>
	
	
<div style="z-index:1; position:relative;">
	<ui:block aura:id="overflowHidden">
		 <aura:set attribute="right">
		 	<ui:inputText class="appInput" aura:id="appInput" value="TestingCloseOnClickOutFeature" maxlength="10"/> <br/>
  		 </aura:set>
	 	<div id="bodyBlockDiv">This is a Test App to Test Panel</div>
	</ui:block>
</div>
	<ui:block aura:id="overflowVisible" overflow="true" tag="span">
		<div id="overflowVisibleBody">div in block body</div>
	</ui:block>
	
	<uitest:panel2_Tester aura:id="tester"
		panelType="{!v.testPanelType}"
		title="{!v.testTitle}"       
		titleDisplay="{!v.testDisplayTitle}"
		class="{!v.testClass}"     
		flavor="{!v.testFlavor}"    
		isVisible="{!v.testIsVisible}" 
		startOfDialogLabel="{!v.testStartOfDialogLabel}"
		closeOnCLickOut="{!v.testCloseOnClickOut}" 
		showCloseButton="{!v.testShowCloseButton}" 
		closeDialogLabel="{!v.testCloseDialogLabel}"
		useTransition="{!v.testUseTransition}"
		animation="{!v.testAnimation}"  
		autoFocus="{!v.testAutoFocus}"  
		direction="{!v.testDirection}"  
		showPointer="{!v.testShowPointer}"
		referenceElement="{!v.testReferenceElement}"
		useReferenceElement="{!v.testUseReferenceElement}"
		referenceElementSelector="{!v.testReferenceElementSelector}"
		useHeader="{!v.testUseHeader}"  
		useFooter="{!v.testUseFooter}"  
		panelHeader="{!v.testPanelHeader}"
		panelFooter="{!v.testPanelFooter}"
		makeScrollable="{!v.testMakeScrollable}"
	/>
	
	<ui:panelManager2>
		<aura:set attribute="registeredPanels">
		    <ui:panel alias="panel"/>
            <ui:modal alias="modal"/>
        </aura:set>
    </ui:panelManager2>
		
</aura:application>
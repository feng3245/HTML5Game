lists = new Meteor.Collection("Lists");
if (Meteor.isClient) {
  /*
  Template.hello.greeting = function () {
    return "My list.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
  */
  Template.categories.lists = function () {
  return lists.find({}, {sort: {Category: 1}});
  };
  // We are declaring the 'adding_category' flag
  Session.set('adding_category', false);
  // This returns true if adding_category has been assigned a value
  //of true

  Template.categories.new_cat = function (){
  return Session.equals('adding_category',true);
  };
  Template.list.items = function(){
    if ((Session.get('current_list')==null) || Session.equals('current_list',null))
      return null;
    else
    {

      var cats = lists.findOne({_id:Session.get('current_list')});

      if (cats&&cats.items)
      {
        if(cats.items.length)
        {
          for(var i = 0; i<cats.items.length;i++) 
          {
            var d = cats.items[i]; d.Lendee = d.LentTo ? d.LentTo :
            "free"; d.LendClass = d.LentTo ?
            "label-important" : "label-success";
          }
        }
        else
        {
            var d = cats.items; d.Lendee = d.LentTo ? d.LentTo :
            "free"; d.LendClass = d.LentTo ?
            "label-important" : "label-success";
            var temp = new Array();
            temp[0] = cats.items;
            return  temp;
        }        
        return cats.items;
      }
     
    }

  };
  Template.list.list_selected = function(){return (!Session.equals('current_list',null)&&Session.get('current_list')!=null); };
  Template.list.list_adding = function(){
    return (Session.equals('list_adding', true));
  };
  Template.list.lendee_editing = function(){
return (Session.equals('lendee_input',this.Name));
};
  Template.categories.events({
	'click #btnNewCat': function (e, t) {
	Session.set('adding_category', true);

	Meteor.flush();
	focusText(t.find("#add-category"));
	},
	'keyup #add-category': function (e,t){
		if(e.which === 13)
		{
			var catVal = String(e.target.value || "");
			if(catVal)
			{
				lists.insert({Category:catVal});
				Session.set('adding_category', false);
			}
		}
	},
	'focusout #add-category': function(e,t){
		Session.set('adding_category',false);
	},
  'click .category': selectCategory
      });
  Template.list.events({
    'click .lendee': function(e,t){
    Session.set('lendee_input',this.Name);
Meteor.flush();
focusText(t.find("#edit_lendee"),this.LentTo);
  },
    'click #btnAddItem': function(e,t){
      Session.set('list_adding', true);
      Meteor.flush();
      focusText(t.find("#item_to_add"));
    },
    'keyup #item_to_add': function (e,t){
      if (e.which === 13)
      {
        addItem(Session.get('current_list'),e.target.value);
        Session.set('list_adding',false);
      }
    },
    'keyup #edit_lendee': function(e,t){
      if(e.which === 13)
      {
          updateLendee(Session.get('current_list'), this.Name, e.target.value);
          Session.set('lendee_input', null);
      }
      if(e.which === 27)
      {

        Session.set('lendee_input', null);
      }
    },
    'focusout #edit_lendee': function(e,t){
      Session.set('lendee_input', null);
    },
    'focusout #item_to_add': function(e,t){
      Session.set('list_adding',false);
    },
    'click .delete_item': function(e,t){
      removeItem(Session.get('current_list'),e.target.id);
    }
});
/////Generic Helper Functions/////
//this function puts our cursor where it needs to be.
function focusText(i, val) {
	i.focus();
  i.value = val? val: "";
	i.select();

	};
}
function selectCategory(e,t){
  Session.set('current_list',this._id);
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
function addItem(list_id,item_name){
  if (!item_name&&!list_id)
    return;
  lists.update({_id:list_id},
    {$addToSet:{items:{Name:item_name}}});
}
function removeItem(list_id,item_name)
{
  if(!item_name&&!list_id)
    return;
  lists.update({_id:list_id},
    {$pull:{items:{Name:item_name}}});
}
function updateLendee(list_id, item_name, lendee_name)
{
  var l = lists.findOne({"_id":list_id , "items.Name":item_name});
  if (l&&l.items)
  {
    for (var i = 0; i<l.items.length; i++)
    {
      if (l.items[i].Name === item_name)
      {
        l.items[i].LentTo = lendee_name;
      }
    }
    lists.update({"_id":list_id},{$set:{"items":l.items}});
  }
}
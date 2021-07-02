// Copyright (c) 2021, Vamsi Krishna and contributors
// For license information, please see license.txt



frappe.ui.form.on("Orders", "onload", function(frm) {
    frm.set_query("tent","tents",function() {
        return {
            "filters": {
                "camp":  cur_frm.doc.camp
            }
        };
    });
  
});
frappe.ui.form.on('Orders',  {
    from_date: function(frm) {
        // use the __islocal value of doc,  to check if the doc is saved or not
        if (frm.doc.from_date < frappe.datetime.get_today()) {
        msgprint('You can not select past date in From Date');
        frm.doc.from_date = '';
        frm.refresh();
    }
    } 
});

frappe.ui.form.on('Orders',  {
    to_date: function(frm) {
        // use the __islocal value of doc,  to check if the doc is saved or not
        if (frm.doc.to_date < frm.doc.from_date) {
        msgprint('You can not select a date before "From Date" ');
        frm.doc.to_date = '';
        frm.refresh();
     } else{
         frm.doc.no_of_days = frappe.datetime.get_day_diff(frm.doc.to_date,frm.doc.from_date);
         net_total = 0 ;
         $.each(frm.doc.tents,  function(i,  d) {
            // calculate incentive
            d.amount = d.rate * d.qty;
            net_total = net_total + d.amount ;
        });
        net_total = frm.doc.no_of_days * net_total;
        $.each(frm.doc.activities,  function(i,  d) {
            // calculate incentive
            d.amount = d.rate * d.qty;
            net_total = net_total + d.amount ;
        });
        frm.doc.total_amount = net_total;
        frm.doc.balance_amount = frm.doc.total_amount - frm.doc.advance_amount;
        frm.refresh();
     }
     
    } 
});

frappe.ui.form.on('Orders',  {
    validate: function(frm) {
       if (frm.doc.from_date < get_today()) {
        msgprint('You can not select past date in From Date');
        frm.doc.from_date = '';
        frm.refresh();
    }
    if (frm.doc.to_date < frm.doc.from_date) {
        msgprint('You can not select a date before From Date');
        frm.doc.to_date = '';
        frm.refresh();
     }
    } 
});
var net_total = 0 ;
frappe.ui.form.on('Tent Item',  {
    qty: function(frm, cdt, cdn) {
         net_total = 0 ;
         var d = locals[cdt][cdn];
         frappe.model.set_value(d.doctype, d.name, 'amount', (d.qty * d.rate));
         frm.doc.tents.forEach(function(y) {
            // calculate incentive
           // frappe.model.set_value(d.doctype, d.name, 'amount', (d.qty * d.rate));
            net_total = net_total + y.amount ;
        });
        net_total = frm.doc.no_of_days * net_total;
        frm.doc.activities.forEach(function(y) {
            // calculate incentive
           // frappe.model.set_value(d.doctype, d.name, 'amount', (d.qty * d.rate));
            net_total = net_total + y.amount ;
        });
        frm.doc.total_amount = net_total;
        frm.doc.balance_amount = frm.doc.total_amount - frm.doc.advance_amount;
        frm.refresh();
        
     } ,
    rate: function(frm, cdt, cdn) {
         net_total = 0 ;
         var x = locals[cdt][cdn];
         frappe.model.set_value(x.doctype, x.name, 'amount', (x.qty * x.rate));
         frm.doc.tents.forEach(function(y) {
            // calculate incentive
           // frappe.model.set_value(d.doctype, d.name, 'amount', (d.qty * d.rate));
            net_total = net_total + y.amount ;
        });
        net_total = frm.doc.no_of_days * net_total;
        frm.doc.activities.forEach(function(y) {
            // calculate incentive
           // frappe.model.set_value(d.doctype, d.name, 'amount', (d.qty * d.rate));
            net_total = net_total + y.amount ;
        });
        frm.doc.total_amount = net_total;
        frm.doc.balance_amount = frm.doc.total_amount - frm.doc.advance_amount;
        frm.refresh();
        
     } 
    
});

frappe.ui.form.on('Activity Item',  {
    qty: function(frm, cdt, cdn) {
         net_total = 0 ;
         var d = locals[cdt][cdn];
         frappe.model.set_value(d.doctype, d.name, 'amount', (d.qty * d.rate));
         frm.doc.tents.forEach(function(y) {
            // calculate incentive
           // frappe.model.set_value(d.doctype, d.name, 'amount', (d.qty * d.rate));
            net_total = net_total + y.amount ;
        });
        net_total = frm.doc.no_of_days * net_total;
        frm.doc.activities.forEach(function(y) {
            // calculate incentive
           // frappe.model.set_value(d.doctype, d.name, 'amount', (d.qty * d.rate));
            net_total = net_total + y.amount ;
        });
        frm.doc.total_amount = net_total;
        frm.doc.balance_amount = frm.doc.total_amount - frm.doc.advance_amount;
        frm.refresh();
     } ,
    rate: function(frm, cdt, cdn) {
         net_total = 0 ;
         var x = locals[cdt][cdn];
         frappe.model.set_value(x.doctype, x.name, 'amount', (x.qty * x.rate));
         frm.doc.tents.forEach(function(y) {
            // calculate incentive
           // frappe.model.set_value(d.doctype, d.name, 'amount', (d.qty * d.rate));
            net_total = net_total + y.amount ;
        });
        net_total = frm.doc.no_of_days * net_total;
        frm.doc.activities.forEach(function(y) {
            // calculate incentive
           // frappe.model.set_value(d.doctype, d.name, 'amount', (d.qty * d.rate));
            net_total = net_total + y.amount ;
        });
        frm.doc.total_amount = net_total;
        frm.doc.balance_amount = frm.doc.total_amount - frm.doc.advance_amount;
        frm.refresh();
        
     } 
    
});



frappe.ui.form.on('Orders',  {
    advance_amount:function(frm) {
         net_total = 0 ;
         $.each(frm.doc.tents,  function(i,  d) {
            // calculate incentive
            d.amount = d.rate * d.qty;
            net_total = net_total + d.amount ;
        });
        net_total = frm.doc.no_of_days * net_total;
        $.each(frm.doc.activities,  function(i,  d) {
            // calculate incentive
            d.amount = d.rate * d.qty;
            net_total = net_total + d.amount ;
        });
        frm.doc.total_amount = net_total;
        frm.doc.balance_amount = frm.doc.total_amount - frm.doc.advance_amount;
        frm.refresh();
        
     } 
        
        
      
});

frappe.listview_settings['Orders'] = {

    hide_name_column: true
    
}





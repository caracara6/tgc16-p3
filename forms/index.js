const forms = require('forms')
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;

var bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) {
        object.widget.classes = [];
    }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }0

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};

const categoryForm = () => {
    return forms.create({
        name: fields.string({
            label: 'Category Name',
            required: true,
            errorAfterField: true,
            validators: [
                validators.required("Please enter the name of the category"),
                validators.maxlength(100, "Please enter a name shorter than 100 characters")
            ]
        }),
    })
}

const countryForm = () => {
    return forms.create({
        name: fields.string({
            label: 'Origin Country Name',
            required: true,
            errorAfterField: true,
            validators: [
                validators.required("Please enter the name of the country"),
                validators.maxlength(100, "Please enter a name shorter than 100 characters")
            ]
        }),
    })
}

const regionForm = () => {
    return forms.create({
        name: fields.string({
            label: 'Region Name',
            required: true,
            errorAfterField: true,
            validators: [
                validators.required("Please enter the name of the region"),
                validators.maxlength(150, "Please enter a name shorter than 150 characters")
            ]
        }),
    })
}

const grapeVarietalForm = () => {
    return forms.create({
        name: fields.string({
            label: 'Grape Varietal',
            required: true,
            errorAfterField: true,
            validators: [
                validators.required("Please enter the name of the grape varietal"),
                validators.maxlength(255, "Please enter a name shorter than 255 characters")
            ]
        }),
    })
}

const sizeForm = () => {
    return forms.create({
        name: fields.string({
            label: 'Bottle Size',
            required: true,
            errorAfterField: true,
            validators: [
                validators.required("Please enter the name of the size"),
                validators.maxlength(255, "Please enter a name shorter than 255 characters")
            ]
        }),
        volume: fields.string({
            label: 'Volume in ml',
            required: true,
            errorAfterField: true,
            validators: [
                validators.required("Please enter the volume"),
                validators.integer("Please enter the volume using numbers"), 
                validators.min(0, "Please enter a positive number")
            ]
        })
    })
}

const producerForm = () => {
    return forms.create({
        name: fields.string({
            label: 'Winery Name',
            required: true,
            errorAfterField: true,
            validators: [
                validators.required("Please enter the name of the winery"),
                validators.maxlength(300, "Please enter a name shorter than 300 characters")
            ]
        }),
        description: fields.string({
            label: 'Winery Description',
            errorAfterField: true,
            widget: widgets.textarea(),
            validators: [validators.maxlength(1000, "Please enter a description shorter than 1000 characters")]
        }),
        producer_image_url: fields.string({
            label: 'Winery Image',
            widget: widgets.hidden()
        }),
    })
}


const productForm = (categories, originCountries, regions, producers, grapeVarietals, sizes) => {
    return forms.create({
        name: fields.string({
            label: 'Name of wine',
            required: true,
            errorAfterField: true,
            validators: [
                validators.required("Please enter the name of the wine"),
                validators.maxlength(255, "Please enter a name shorter than 255 characters")
            ]
        }),
        description: fields.string({
            label: 'Wine Description',
            widget: widgets.textarea(),
            errorAfterField: true,
            validators: [
                validators.maxlength(1000, "Please enter a description shorter than 1000 characters")
            ]
        }),
        category_id: fields.string({
            label: 'Category',
            required: true,
            errorAfterField: true,
            widget: widgets.select(),
            choices: categories
        }),
        origin_country_id: fields.string({
            label: 'Origin Country',
            required: true,
            errorAfterField: true,
            widget: widgets.select(),
            choices: originCountries
        }),
        region_id: fields.string({
            label: 'Region',
            required: true,
            errorAfterField: true,
            widget: widgets.select(),
            choices: regions
        }),
        producer_id: fields.string({
            label: 'Producer',
            required: true,
            errorAfterField: true,
            widget: widgets.select(),
            choices: producers
        }),
        grape_varietals: fields.string({
            label: 'Grape Varietal',
            required: true,
            errorAfterField: true,
            widget: widgets.multipleSelect(),
            choices: grapeVarietals
        }),
        sizes: fields.string({
            label: 'Size',
            required: true,
            errorAfterField: true,
            widget: widgets.multipleSelect(),
            choices: sizes
        }),
        nose_attribute: fields.string({
            label: 'Description of nose attributes',
            widget: widgets.textarea(),
            errorAfterField: true,
            validators: [
                validators.maxlength(500, "Please enter a description shorter than 500 characters")
            ]
        }),
        mouth_attribute: fields.string({
            label: 'Description of mouth attributes',
            widget: widgets.textarea(),
            errorAfterField: true,
            validators: [
                validators.maxlength(500, "Please enter a description shorter than 500 characters")
            ]
        }),
        alcohol_percentage: fields.string({
            label: 'Alcohol Percentage',
            errorAfterField: true,
            validators: [ 
                validators.maxlength(10, "Please enter a percentage shorter than 10 characters")
            ]
        }),
        price: fields.string({
            label: 'Price in cents',
            required: true,
            errorAfterField: true,
            validators: [
                validators.required("Please enter the price"),
                validators.integer("Please enter the price using numbers"), 
                validators.min(0, "Please enter a positive number")
            ]
        }),
        stock: fields.string({
            label: 'Quantity in stock',
            required: true,
            errorAfterField: true,
            validators: [
                validators.required("Please enter the stock"),
                validators.integer("Please enter the stock using numbers"), 
                validators.min(0, "Please enter a positive number")
            ]
        }),
        vintage: fields.string({
            label: 'Vintage',
            required: true,
            errorAfterField: true,
            validators: [
                validators.required("Please enter the vintage"),
                validators.integer("Please enter the vintage using numbers"), 
                validators.min(0, "Please enter a positive number"),
                validators.max(9999, "Please enter a valid vintage year")
            ]
        }),
        image_url: fields.string({
            widget: widgets.hidden()
        }),
        thumbnail_url: fields.string({
            widget: widgets.hidden()
        })
    })
}

const registrationForm = () => {
    return forms.create({
        'first_name': fields.string({
            required: true,
            errorAfterField: true
            
        }),
        'last_name': fields.string({
            required: true,
            errorAfterField: true
            
        }),
        'email': fields.email({
            required: true,
            errorAfterField: true
            
        }),
        'password': fields.password({
            required: true,
            errorAfterField: true
            
        }),
        'confirm_password': fields.password({
            required: true,
            errorAfterField: true,
            validators: [validators.matchField('password')]
        })
    })
}

const loginForm = () => {
    return forms.create({
        'email': fields.string({
            'required': true,
            'errorAfterField': true,
        }),
        'password': fields.password({
            'required': true,
            'errorAfterField': true
        })
    })
}


module.exports = {
    bootstrapField, 
    categoryForm, 
    countryForm, 
    regionForm,
    grapeVarietalForm,
    sizeForm,
    producerForm,
    productForm,
    registrationForm,
    loginForm
}
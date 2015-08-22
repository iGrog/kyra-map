(function ($)
{

    $.mapDrag = function (element, options)
    {

        var defaults = {
            latField: '#latitude',
            lngField: '#longitude',
            address: '#address',
            addressComponents: '#addressComponents',
            language: 'en'
        };

        var plugin = this;
        var map = null;
        var latField = null;
        var lngField = null;
        var marker = null;
        var address = null;
        var components = null;

        var _geocoder = new google.maps.Geocoder();

        plugin.settings = {};

        var $el = $(element);

        plugin.init = function ()
        {
            plugin.settings = $.extend({}, defaults, options);

            plugin.latField = $(plugin.settings.latField);
            plugin.lngField = $(plugin.settings.lngField);

            plugin.latField.on('change', plugin.refreshMap);
            plugin.lngField.on('change', plugin.refreshMap);

            plugin.marker = null;

            plugin.map = new GMaps({
                el: element,
                lat: 0,
                lng: 0,
                zoomControl: true,
                panControl: true,
                streetViewControl: true,
                mapTypeControl: true,
                overviewMapControl: true
            });

            plugin.marker = plugin.map.addMarker({
                lat: 0,
                lng: 0,
                animation: google.maps.Animation.DROP,
                draggable: true,
                title: '',
                dragend: function (e2)
                {
                    plugin.latField.val(e2.latLng.lat());
                    plugin.lngField.val(e2.latLng.lng());

                    var latlng = new google.maps.LatLng(e2.latLng.lat(), e2.latLng.lng());

                    _geocoder.geocode({latLng: latlng, language: plugin.settings.language}, function (results, status)
                    {
                        if (status == google.maps.GeocoderStatus.OK)
                        {
                            if(results[0] && results[0].address_components)
                            {
                                plugin.components.val(JSON.stringify(results[0]));
                                plugin.address.val(results[0].formatted_address);
                            }
                            else
                            {
                                if(plugin.components)
                                    plugin.components.val('');
                            }
                        }
                        else
                        {
                            if(plugin.components)
                                plugin.components.val('');
                        }
                    });

                    plugin.refreshMap();
                }
            });

            var ac = null;

            plugin.address = $(plugin.settings.address);
            if (plugin.address.length)
            {
                plugin.address.on("keyup keypress", function (e)
                {
                    var code = e.keyCode || e.which;
                    if (code == 13)
                    {
                        e.preventDefault();
                        return false;
                    }
                });

                ac = new google.maps.places.Autocomplete(plugin.address[0], { language: plugin.settings.language });
                google.maps.event.addListener(ac, 'place_changed', function ()
                {
                    var place = ac.getPlace();
                    if (place != null)
                    {
                        if (place.geometry && place.geometry.location)
                        {
                            plugin.latField.val(place.geometry.location.lat());
                            plugin.lngField.val(place.geometry.location.lng());
                            plugin.latField.change();
                            if (plugin.components)
                                plugin.components.val(JSON.stringify(place));
                        }
                    }
                });
            }

            plugin.components = $(plugin.settings.addressComponents);
            plugin.refreshMap();
        };

        plugin.refreshMap = function ()
        {
            var lat = parseFloat(plugin.latField.val()) || 0;
            var lng = parseFloat(plugin.lngField.val()) || 0;
            plugin.map.setCenter(lat, lng);
            var latlng = new google.maps.LatLng(lat, lng);
            plugin.marker.setPosition(latlng);
        };

        plugin.init();
    };

    $.fn.mapDrag = function (options)
    {
        return this.each(function ()
        {
            if (undefined == $(this).data('mapDrag'))
            {
                var plugin = new $.mapDrag(this, options);
                $(this).data('mapDrag', plugin);
            }
        });
    }

})(jQuery);













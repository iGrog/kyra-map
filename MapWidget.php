<?php

namespace kyra\map;

/**
 * This is just an example.
 */
class MapWidget extends \yii\base\Widget
{
    public $latField = 'Latitude';
    public $lngField = 'Longitude';
    public $addressField = 'Address';
    public $addressComponents = 'AddressComponents';
    public $model = null;
    public $options = [];

    public function run()
    {
        MapAsset::register(\Yii::$app->view);
        if(!isset($this->options['id'])) $this->options['id'] = uniqid();
        return $this->render('map');
    }
}

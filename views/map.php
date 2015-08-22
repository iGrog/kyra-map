<?php


use yii\helpers\Html;

$latField = Html::getInputId($this->context->model, $this->context->latField);
$lngField = Html::getInputId($this->context->model, $this->context->lngField);
$addressField = substr($this->context->addressField, 0, 1) == '#'
                ? substr($this->context->addressField, 1)
                : Html::getInputId($this->context->model, $this->context->addressField);

$addressComponents = Html::getInputId($this->context->model, $this->context->addressComponents);

echo Html::tag('div', '', $this->context->options);

$js = <<<EEE

$('#{$this->context->options['id']}').mapDrag({
latField: '#$latField',
lngField: '#$lngField',
address: '#$addressField',
addressComponents: '#$addressComponents'
});

EEE;

$this->registerJs($js);


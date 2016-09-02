<?php

$options = array('encoding'           => 'UTF-8',
                 'connection_timeout' => 5,
                 'exceptions'         => 1,
                 );

$location = 'http://www.OpenLigaDB.de/Webservices/Sportsdata.asmx?WSDL';

try
{
    $client = new SoapClient($location, $options);
    $params = new stdClass;
    $params->MatchID = 3014;
    $response = $client->GetMatchByMatchID($params);
}
catch (SoapFault $e)
{
    die($e->faultcode . ': ' . $e->faultstring);
}
catch (Exception $e)
{
    die($e->getCode() . ': ' . $e->getMessage());
}

print_r($response->GetMatchByMatchIDResult);

?>
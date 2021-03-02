
$json = Get-Content -Raw -Path 'C:\Users\Weston Jones\source\repos\getRequest\jsonTester.json' | ConvertFrom-Json

$newjson = $json | ConvertTo-Json -Compress
 
# Initiate the POST request including the headers and the JSON payload
#$response = Invoke-RestMethod 'https://scheduler.luminarycxm.com/api/v1/cleaned/data/test/' -Method Post -Body $newjson -ContentType 'application/json' -Headers $headers
 
 $response = Invoke-RestMethod 'https://ptsv2.com/t/1psqp-1614718902/post' -Method Post -Body $newjson -ContentType 'application/json' -Headers $headers
 
 

# Echo the response
Write-Host $response
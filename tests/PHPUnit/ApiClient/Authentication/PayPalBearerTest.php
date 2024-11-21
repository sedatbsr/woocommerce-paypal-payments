<?php
declare(strict_types=1);

namespace WooCommerce\PayPalCommerce\ApiClient\Authentication;

use Requests_Utility_CaseInsensitiveDictionary;
use WooCommerce\PayPalCommerce\ApiClient\Exception\RuntimeException;
use WooCommerce\PayPalCommerce\ApiClient\Helper\Cache;
use Psr\Log\LoggerInterface;
use Mockery;
use WooCommerce\PayPalCommerce\TestCase;
use WooCommerce\PayPalCommerce\WcGateway\Settings\Settings;
use function Brain\Monkey\Functions\expect;

class PayPalBearerTest extends TestCase
{

	public function testDefault()
    {
	    expect('wp_json_encode')->andReturnUsing('json_encode');
        $json = '{"access_token":"abc","expires_in":100, "created":' . time() . '}';
        $cache = Mockery::mock(Cache::class);
        $cache
            ->expects('get')
            ->andReturn('{"access_token":"abc","expires_in":100, "created":100}');
        $cache
            ->expects('set');
        $host = 'https://example.com';
        $key = 'key';
        $secret = 'secret';
        $logger = Mockery::mock(LoggerInterface::class);
        $logger->shouldReceive('debug');
        $settings = Mockery::mock(Settings::class);
        $settings->shouldReceive('has')->andReturn(true);
        $settings->shouldReceive('get')->andReturn('');
        $headers = Mockery::mock(Requests_Utility_CaseInsensitiveDictionary::class);
        $headers->shouldReceive('getAll');

        $bearer = new PayPalBearer($cache, $host, $key, $secret, $logger, $settings);

        expect('trailingslashit')
            ->with($host)
            ->andReturn($host . '/');
        expect('wp_remote_get')
            ->andReturnUsing(
                function ($url, $args) use ($json, $key, $secret, $host, $headers) {
                    if ($url !== $host . '/v1/oauth2/token?grant_type=client_credentials') {
                        return false;
                    }
                    if ($args['method'] !== 'POST') {
                        return false;
                    }
                    if ($args['headers']['Authorization'] !== 'Basic ' . base64_encode($key . ':' . $secret)) {
                        return false;
                    }

                    return [
                        'body' => $json,
						'headers' => $headers
                    ];
                }
            );
        expect('is_wp_error')
            ->andReturn(false);
        expect('wp_remote_retrieve_response_code')
            ->andReturn(200);

        $token = $bearer->bearer();
        $this->assertEquals("abc", $token->token());
        $this->assertTrue($token->is_valid());
    }

    public function testNoTokenCached()
    {
	    expect('wp_json_encode')->andReturnUsing('json_encode');
        $json = '{"access_token":"abc","expires_in":100, "created":' . time() . '}';
        $cache = Mockery::mock(Cache::class);
        $cache
            ->expects('get')
            ->andReturn('');
        $cache
            ->expects('set');
        $host = 'https://example.com';
        $key = 'key';
        $secret = 'secret';
        $logger = Mockery::mock(LoggerInterface::class);
        $logger->shouldReceive('debug');
        $settings = Mockery::mock(Settings::class);
        $settings->shouldReceive('has')->andReturn(true);
        $settings->shouldReceive('get')->andReturn('');
		$headers = Mockery::mock(Requests_Utility_CaseInsensitiveDictionary::class);
		$headers->shouldReceive('getAll');

        $bearer = new PayPalBearer($cache, $host, $key, $secret, $logger, $settings);

        expect('trailingslashit')
            ->with($host)
            ->andReturn($host . '/');
        expect('wp_remote_get')
            ->andReturnUsing(
                function ($url, $args) use ($json, $key, $secret, $host, $headers) {
                    if ($url !== $host . '/v1/oauth2/token?grant_type=client_credentials') {
                        return false;
                    }
                    if ($args['method'] !== 'POST') {
                        return false;
                    }
                    if ($args['headers']['Authorization'] !== 'Basic ' . base64_encode($key . ':' . $secret)) {
                        return false;
                    }

                    return [
                        'body' => $json,
						'headers' => $headers,
                    ];
                }
            );
        expect('is_wp_error')
            ->andReturn(false);
        expect('wp_remote_retrieve_response_code')
            ->andReturn(200);

        $token = $bearer->bearer();
        $this->assertEquals("abc", $token->token());
        $this->assertTrue($token->is_valid());
    }

    public function testCachedTokenIsStillValid()
    {
        $json = '{"access_token":"abc","expires_in":100, "created":' . time() . '}';
        $cache = Mockery::mock(Cache::class);
        $cache
            ->expects('get')
            ->andReturn($json);
        $host = 'https://example.com';
        $key = 'key';
        $secret = 'secret';
        $logger = Mockery::mock(LoggerInterface::class);
        $logger->shouldNotReceive('warning');
        $settings = Mockery::mock(Settings::class);
        $settings->shouldReceive('has')->andReturn(true);
        $settings->shouldReceive('get')->andReturn('');

        $bearer = new PayPalBearer($cache, $host, $key, $secret, $logger, $settings);

        $token = $bearer->bearer();
        $this->assertEquals("abc", $token->token());
        $this->assertTrue($token->is_valid());
    }

    public function testExceptionThrownOnError()
    {
        $json = '{"access_token":"abc","expires_in":100, "created":' . time() . '}';
        $cache = Mockery::mock(Cache::class);
        $cache
            ->expects('get')
            ->andReturn('');
        $host = 'https://example.com';
        $key = 'key';
        $secret = 'secret';
        $logger = Mockery::mock(LoggerInterface::class);
        $logger->shouldReceive('warning');
        $logger->shouldReceive('debug');
        $settings = Mockery::mock(Settings::class);
        $settings->shouldReceive('has')->andReturn(true);
        $settings->shouldReceive('get')->andReturn('');
		$headers = Mockery::mock(Requests_Utility_CaseInsensitiveDictionary::class);
		$headers->shouldReceive('getAll');

        $bearer = new PayPalBearer($cache, $host, $key, $secret, $logger, $settings);

        expect('trailingslashit')
            ->with($host)
            ->andReturn($host . '/');
        expect('wp_remote_get')
            ->andReturnUsing(
                function ($url, $args) use ($json, $key, $secret, $host, $headers) {
                    if ($url !== $host . '/v1/oauth2/token?grant_type=client_credentials') {
                        return false;
                    }
                    if ($args['method'] !== 'POST') {
                        return false;
                    }
                    if ($args['headers']['Authorization'] !== 'Basic ' . base64_encode($key . ':' . $secret)) {
                        return false;
                    }

                    return [
                        'body' => $json,
						'headers' => $headers,
                    ];
                }
            );
        expect('is_wp_error')
            ->andReturn(true);

        $this->expectException(RuntimeException::class);
        $bearer->bearer();
    }

    public function testExceptionThrownBecauseOfHttpStatusCode()
    {
        $json = '{"access_token":"abc","expires_in":100, "created":' . time() . '}';
        $cache = Mockery::mock(Cache::class);
        $cache
            ->expects('get')
            ->andReturn('');
        $host = 'https://example.com';
        $key = 'key';
        $secret = 'secret';
        $logger = Mockery::mock(LoggerInterface::class);
        $logger->shouldReceive('warning');
        $logger->shouldReceive('debug');
        $settings = Mockery::mock(Settings::class);
        $settings->shouldReceive('has')->andReturn(true);
        $settings->shouldReceive('get')->andReturn('');
		$headers = Mockery::mock(Requests_Utility_CaseInsensitiveDictionary::class);
		$headers->shouldReceive('getAll');

        $bearer = new PayPalBearer($cache, $host, $key, $secret, $logger, $settings);

        expect('trailingslashit')
            ->with($host)
            ->andReturn($host . '/');
        expect('wp_remote_get')
            ->andReturnUsing(
                function ($url, $args) use ($json, $key, $secret, $host, $headers) {
                    if ($url !== $host . '/v1/oauth2/token?grant_type=client_credentials') {
                        return false;
                    }
                    if ($args['method'] !== 'POST') {
                        return false;
                    }
                    if ($args['headers']['Authorization'] !== 'Basic ' . base64_encode($key . ':' . $secret)) {
                        return false;
                    }

                    return [
                        'body' => $json,
						'headers' => $headers,
                    ];
                }
            );
        expect('is_wp_error')
            ->andReturn(false);
        expect('wp_remote_retrieve_response_code')
            ->andReturn(500);

        $this->expectException(RuntimeException::class);
        $bearer->bearer();
    }
}

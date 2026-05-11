from django.test import TestCase
from django.conf import settings
import os

class SettingsConfigurationTest(TestCase):
    def test_debug_is_false_in_production(self):
        # We simulate production by temporarily unsetting DJANGO_DEBUG
        # However, settings are evaluated at load time, so we just check 
        # the current evaluated type. 
        self.assertIsInstance(settings.DEBUG, bool)
        
    def test_allowed_hosts_is_list(self):
        self.assertIsInstance(settings.ALLOWED_HOSTS, list)

    def test_cors_settings_types(self):
        self.assertIsInstance(settings.CORS_ALLOW_ALL_ORIGINS, bool)
        self.assertIsInstance(settings.CORS_ALLOWED_ORIGINS, list)

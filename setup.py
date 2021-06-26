from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in tripforlife/__init__.py
from tripforlife import __version__ as version

setup(
	name='tripforlife',
	version=version,
	description='We are an Adventure Tourisim Company',
	author='Vamsi Krishna',
	author_email='vamsi.pandranki@live.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)

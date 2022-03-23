module.exports = {
  "extends": ["react-app", "react-app/jest", "plugin:storybook/recommended"],
  "overrides": [
    {
      "files": [
        "**/*.stories.*"
      ],
      "rules": {
        "import/no-anonymous-default-export": "off"
      }
    }
  ],
  "root": true
};
